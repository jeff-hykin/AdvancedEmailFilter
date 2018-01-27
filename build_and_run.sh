# try to delete the FAME.app on the desktop if its there 
rm -rf "$HOME/Desktop/FAME.app"

# disable the debugging in main.js 
# this just comments-out the line:
#    require('electron-debug')({showDevTools: true})
sed -i ''  -e "s/require(\\'electron-debug/\/\/ require(\\'electron-debug/" main.js

# then package up everything, name it FAME
electron-packager $PWD FAME --debug --platform=darwin --arch=x64 --electron-version=1.6.11 --out="$HOME/Desktop" --overwrite

# once thats done take the app out of the package 
mv "$HOME/Desktop/FAME-darwin-x64/FAME.app" "$HOME/Desktop"

# remove all the other stuff that was in the folder
rm -rf "$HOME/Desktop/FAME-darwin-x64"

# re-enable the debugging in main.js 
# this just un-comments-out the line:
#    require('electron-debug')({showDevTools: true})
sed -i ''  -e "s/\/\/ *require(\\'electron-debug/require(\\'electron-debug/" main.js

open "$HOME/Desktop/FAME.app"