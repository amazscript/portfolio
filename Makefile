# Portfolio Denis Decilap — commandes courantes
# Usage : `make` (ou `make help`) pour la liste.

# Charge .env.local s'il existe (pour les commandes locales qui en ont besoin)
-include .env.local
export

COMPOSE      := docker compose
DEV_PROFILE  := --profile dev
PROD_PROFILE := --profile prod
URL          := http://localhost:3000

# Déploiement production (git push → VPS)
PROD_HOST    := ssh-vps
PROD_REMOTE  := prod
PROD_BRANCH  := main
PROD_URL     := https://decilapdenis.fr
PROD_DIR     := /srv/sites/portfolio

.DEFAULT_GOAL := help

## ---------------------------------------------------------------------------
## Aide
## ---------------------------------------------------------------------------
.PHONY: help
help: ## Affiche cette aide
	@echo ""
	@echo "  Portfolio — commandes disponibles :"
	@echo ""
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

## ---------------------------------------------------------------------------
## Développement local (Node)
## ---------------------------------------------------------------------------
.PHONY: install
install: ## Installe les dépendances npm
	npm install

.PHONY: dev
dev: ## Lance le serveur de dev local (hot-reload) sur :3000
	npm run dev

.PHONY: build
build: ## Build de production local
	npm run build

.PHONY: start
start: ## Démarre le build de production local
	npm run start

.PHONY: lint
lint: ## Lint du code
	npm run lint

## ---------------------------------------------------------------------------
## Docker — développement (hot-reload en conteneur)
## ---------------------------------------------------------------------------
.PHONY: docker-dev
docker-dev: ## Lance l'environnement de dev dans Docker (hot-reload)
	$(COMPOSE) $(DEV_PROFILE) up

.PHONY: docker-dev-down
docker-dev-down: ## Arrête l'environnement de dev Docker
	$(COMPOSE) $(DEV_PROFILE) down

## ---------------------------------------------------------------------------
## Docker — production (image optimisée Next standalone)
## ---------------------------------------------------------------------------
.PHONY: up
up: ## Build + lance le site en prod (Docker, détaché) puis attend :3000
	$(COMPOSE) $(PROD_PROFILE) up -d --build web
	@printf "Démarrage"; \
	for i in $$(seq 1 20); do \
		if [ "$$(curl -s -o /dev/null -w '%{http_code}' $(URL) 2>/dev/null)" = "200" ]; then \
			echo " → en ligne sur $(URL)"; exit 0; fi; \
		printf "."; sleep 1; \
	done; echo " (le conteneur met du temps, voir 'make logs')"

.PHONY: local-prod
local-prod: up ## Alias local de 'up' (prod sur ta machine)

.PHONY: down
down: ## Arrête et supprime les conteneurs de prod
	$(COMPOSE) $(PROD_PROFILE) down

.PHONY: restart
restart: down up ## Redémarre la prod (down + up)

.PHONY: logs
logs: ## Suit les logs du conteneur web
	$(COMPOSE) $(PROD_PROFILE) logs -f web

.PHONY: ps
ps: ## Affiche l'état des conteneurs
	$(COMPOSE) $(PROD_PROFILE) ps

.PHONY: shell
shell: ## Ouvre un shell dans le conteneur web
	$(COMPOSE) $(PROD_PROFILE) exec web sh

## ---------------------------------------------------------------------------
## Déploiement production (VPS via git push → build & SSL auto Traefik)
## ---------------------------------------------------------------------------
.PHONY: prod
prod: ## Déploie en prod sur le VPS (git push main → build & run)
	@git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "❌ Pas un dépôt git. Lance 'make prod-init' une fois."; exit 1; }
	@git remote get-url $(PROD_REMOTE) >/dev/null 2>&1 || { echo "❌ Remote '$(PROD_REMOTE)' absent. Lance 'make prod-init'."; exit 1; }
	@git diff --quiet && git diff --cached --quiet || { echo "❌ Changements non commités. Fais: git add -A && git commit -m \"...\""; exit 1; }
	@echo "→ Push vers la prod ($(PROD_HOST))…"
	git push $(PROD_REMOTE) $(PROD_BRANCH)
	@echo "✅ Déployé. Vérifie : $(PROD_URL)"

.PHONY: prod-init
prod-init: ## Configure le remote git de prod (à lancer une seule fois)
	@git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init -b $(PROD_BRANCH)
	@git remote get-url $(PROD_REMOTE) >/dev/null 2>&1 \
		&& git remote set-url $(PROD_REMOTE) $(PROD_HOST):/srv/git/portfolio.git \
		|| git remote add $(PROD_REMOTE) $(PROD_HOST):/srv/git/portfolio.git
	@echo "✅ Remote '$(PROD_REMOTE)' → $(PROD_HOST):/srv/git/portfolio.git"

.PHONY: prod-logs
prod-logs: ## Suit les logs du conteneur de prod sur le VPS
	ssh $(PROD_HOST) 'cd $(PROD_DIR) && docker compose -f docker-compose.prod.yml logs -f --tail 80'

.PHONY: prod-restart
prod-restart: ## Recharge le conteneur de prod (prend en compte .env.local, sans rebuild)
	ssh $(PROD_HOST) 'cd $(PROD_DIR) && docker compose -f docker-compose.prod.yml up -d'

.PHONY: prod-status
prod-status: ## État du conteneur de prod + HTTP du site en ligne
	@ssh $(PROD_HOST) 'docker ps --filter name=portfolio-app --format "{{.Names}} → {{.Status}}"'
	@echo "→ HTTPS : $$(curl -s -o /dev/null -w '%{http_code}' $(PROD_URL))"

## ---------------------------------------------------------------------------
## Vérifications & SEO
## ---------------------------------------------------------------------------
.PHONY: check
check: ## Vérifie les points clés du site en ligne (SSG, JSON-LD, SEO, sécurité)
	@echo "→ HTTP :        $$(curl -s -o /dev/null -w '%{http_code}' $(URL))"
	@echo "→ JSON-LD :     $$(curl -s $(URL) | grep -o '"@type":"[A-Za-z]*"' | sort -u | tr '\n' ' ')"
	@echo "→ Sitemap URLs :$$(curl -s $(URL)/sitemap.xml | grep -o '<loc>' | wc -l | tr -d ' ')"
	@echo "→ robots.txt :  $$(curl -s $(URL)/robots.txt | head -1)"
	@echo "→ Sécurité :    $$(curl -sI $(URL) | grep -ic 'strict-transport\|x-frame\|x-content-type') en-têtes présents"

.PHONY: sitemap
sitemap: ## Affiche le sitemap.xml
	@curl -s $(URL)/sitemap.xml

.PHONY: robots
robots: ## Affiche le robots.txt
	@curl -s $(URL)/robots.txt

## ---------------------------------------------------------------------------
## Nettoyage
## ---------------------------------------------------------------------------
.PHONY: clean
clean: ## Supprime les artefacts de build (.next, out)
	rm -rf .next out

.PHONY: clean-all
clean-all: down ## Nettoyage complet (build + node_modules + volumes Docker)
	rm -rf .next out node_modules
	$(COMPOSE) $(PROD_PROFILE) down -v --remove-orphans 2>/dev/null || true
	$(COMPOSE) $(DEV_PROFILE) down -v --remove-orphans 2>/dev/null || true

.PHONY: env
env: ## Crée .env.local depuis .env.example (si absent)
	@if [ -f .env.local ]; then \
		echo ".env.local existe déjà — rien à faire."; \
	else \
		cp .env.example .env.local && echo ".env.local créé depuis .env.example — complétez vos clés."; \
	fi
