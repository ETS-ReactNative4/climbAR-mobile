# climbAR-mobile
Setup:

1. Paste all of the following into your terminal prompt at your root directory, this is to install Homebrew which works like “npm” for your computer and is used for compiling native applications:  https://brew.sh/

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


2. After installing brew with the above command line, please download xcode from the apple appstore, this will take a lot of memory and takes a longtime to install. The reason for downloading xcode is that the project needs to run on an emulator since this is no longer a web application anymore.

3. clone the repo and open the repo, to run the application on xcode, please use the following command: 
		npx react-native run-ios 

4. Documentation for react native : https://reactnative.dev/docs/getting-started


**Adding Custom Fonts**
1. Download and unzip the font you want (e.g. Roboto can be downloaded [here](https://fonts.google.com/specimen/Roboto?selection.family=Roboto)
2. Add the ttf files corresponding to the fonts that you want to the folder assets/fonts
3. In ios/ClimbARmobile/info.plist add the names of the files you just added to the markup like this:
	*Example adding all of the Roboto variations to an ios App*
	
`	<array>
	
		string>Roboto-Black.ttf</string>
		
		<string>Roboto-BlackItalic.ttf</string>
		
		<string>Roboto-Bold.ttf</string>
		
		<string>Roboto-BoldItalic.ttf</string>
		
		<string>Roboto-Italic.ttf</string>
		
		<string>Roboto-Light.ttf</string>
		
		<string>Roboto-LightItalic.ttf</string>
		
		<string>Roboto-Medium.ttf</string>
		
		<string>Roboto-MediumItalic.ttf</string>
		
		<string>Roboto-Regular.ttf</string>
		
		<string>Roboto-Thin.ttf</string>
		
		<string>Roboto-ThinItalic.ttf</string>
		
	</array>`
	
4. In you CLI in the root of the app run `npx react-native link`. You should see a message confirming that your assets were linked to the app
5. Terminate the ios simulator if it's running `ctrl+c`
6. from the root of the app run `npm run ios`


