#!/usr/bin/env sh
echo "Upgrading packages..."
cd account
ncu -u;
cd ..;
cd default;
ncu -u;
cd ..;
echo "\nDone.\n";
