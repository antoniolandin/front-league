#!/bin/bash
# Description: install mongodb
# Author: antoniolandin

# check OS
if command -v pacman &>/dev/null; then
    # check if yay is installed
    if ! pacman -Q yay &>/dev/null; then
        cd $HOME
        git clone https://aur.archlinux.org/yay.git
        cd yay
        makepkg -si
        cd $HOME
        rm -rf $HOME/yay
    else
        echo "yay already installed"
    fi

   
    # yay packages
    YAY_PACKAGES=(
       "mongodb-bin" 
    )

    # install yay packages 
    for PACKAGE_NAME in "${YAY_PACKAGES[@]}"; do
        # check if package is installed
        if ! yay -Q "$PACKAGE_NAME" &> /dev/null; then
            yay -S --noconfirm "$PACKAGE_NAME"
        else
            echo "$PACKAGE_NAME already installed"
        fi
    done
    
    # start mongodb service
    systemctl start mongodb.service

else
    echo "This script only works for arch based systems"
fi
