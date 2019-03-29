#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive

source tools/colors.sh

rm -rf /var/lib/dpkg/lock
rm -rf /var/cache/debconf/*.*

echo -e "\n"
header "Preparing Environment For The Installer"

info "Updating Packages ..."
apt-get -qq update
success "OK"

info "Installing NodeJS ..."
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - | grep -q ''
apt-get install -qq nodejs > /dev/null
success "OK"

header "Launching The Installer ..."

node index.js $@
