#!/usr/bin/env bash
set -euo pipefail

# This script automates the GitHub CLI commands described in README.md
# It applies branch protection policies, creates organization teams, and creates repository labels.
# Requirements:
# - GitHub CLI (gh) installed and authenticated: gh auth login
# - Proper permissions: admin on org for teams, maintainer on repo for labels and branch protection
#
# Usage:
#   ./scripts/setup-github.sh ORG OWNER REPO
# Example:
#   ./scripts/setup-github.sh my-org testando-gitflow exemplo

if [ $# -ne 3 ]; then
  echo "Usage: $0 ORG OWNER REPO"
  exit 1
fi

ORG="$1"
OWNER="$2"
REPO="$3"
REPO_SLUG="${OWNER}/${REPO}"

# Verify gh authentication
if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run: gh auth login"
  exit 1
fi

echo "Applying branch protection policies to ${REPO_SLUG}..."
# Branch protection: main
if [ -f .github/branch-protection-policies/branch-protection-main.json ]; then
  gh api "repos/${REPO_SLUG}/branches/main/protection" \
    --method PUT \
    --input .github/branch-protection-policies/branch-protection-main.json
else
  echo "Warning: .github/branch-protection-policies/branch-protection-main.json not found. Skipping main protection."
fi

# Branch protection: dev
if [ -f .github/branch-protection-policies/branch-protection-dev.json ]; then
  gh api "repos/${REPO_SLUG}/branches/dev/protection" \
    --method PUT \
    --input .github/branch-protection-policies/branch-protection-dev.json
else
  echo "Warning: .github/branch-protection-policies/branch-protection-dev.json not found. Skipping dev protection."
fi

echo "Creating organization teams in ${ORG}..."
# Teams creation (visible across the org): use privacy=closed instead of secret
gh api "orgs/${ORG}/teams" -f name='dev-frontend' -f privacy='closed' || true
gh api "orgs/${ORG}/teams" -f name='dev-backend' -f privacy='closed' || true
gh api "orgs/${ORG}/teams" -f name='dev-seniors' -f privacy='closed' || true

echo "Creating repository labels in ${REPO_SLUG}..."
# Labels creation
gh label create "frontend" --color "1D76DB" --description "Mudanças no frontend" --repo "${REPO_SLUG}" || true
gh label create "backend" --color "D73A4A" --description "Mudanças no backend" --repo "${REPO_SLUG}" || true
gh label create "infra" --color "5319E7" --description "Infraestrutura" --repo "${REPO_SLUG}" || true
gh label create "docs" --color "0075CA" --description "Documentação" --repo "${REPO_SLUG}" || true
gh label create "ci" --color "A2EEEF" --description "Integração contínua" --repo "${REPO_SLUG}" || true
gh label create "release" --color "FBCA04" --description "Release" --repo "${REPO_SLUG}" || true

echo "All steps completed."
