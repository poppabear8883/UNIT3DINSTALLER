#!/usr/bin/env bash

rm -rf /var/lib/dpkg/lock
rm -rf /var/cache/debconf/*.*

apt-get update

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install -y nodejs

node index.js $@
