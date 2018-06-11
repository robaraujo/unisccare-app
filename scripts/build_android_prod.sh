#!/bin/bash

BUILD_FOLDER=platforms/android/app/build/outputs/apk/release
ADB_FOLDER=~/Library/Android/sdk/platform-tools
SAVE_FOLDER=~/Desktop

KEY_STORE=~/Certificate/Android/localdrive_app.keystore
KEY_STORE_ALIAS=localdrive_app
KEY_STORE_PASS=local421566

APP_NAME=com.robaraujo.bariunisc

APP_BUILD_NAME=app-release-unsigned.apk

APP_SAVE_NAME=bariunisc_app.apk

ZIPALIGN_FOLDER=~/Library/Android/sdk/build-tools/26.0.1

echo "# Start clean"
rm -rf  $BUILD_FOLDER
rm $SAVE_FOLDER/bariunisc_app.apk
echo "# Clean finished"

echo "# Start build"
ionic cordova build android --release --prod 
echo "# Build finished"

echo "# Certified app"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass $KEY_STORE_PASS -keystore $KEY_STORE $BUILD_FOLDER/$APP_BUILD_NAME $KEY_STORE_ALIAS
echo "# Finished Certified"

echo "# Start zipalign"
$ZIPALIGN_FOLDER/zipalign -v 4 $BUILD_FOLDER/$APP_BUILD_NAME $SAVE_FOLDER/$APP_SAVE_NAME
echo "# Finish zipalign"

echo "# Start adb server"
$ADB_FOLDER/adb devices

echo -n "Your device exist in list (type y or n) ?"
read exist
if [ "$exist" == "y" ]; then

    echo -n "Uninstall previous version (type y or n) ? "
    read un
    if [ "$un" == "y" ]; then
        $ADB_FOLDER/adb uninstall $APP_NAME
    fi

    $ADB_FOLDER/adb install -r $SAVE_FOLDER/$APP_SAVE_NAME
fi
