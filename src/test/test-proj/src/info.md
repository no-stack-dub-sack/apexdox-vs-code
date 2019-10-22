# Info
This directory will be used for vscode integration testing. The 'ApexDox: Run' command will be called against the files in this directory, which is set up akin to an DX project, with mutliple features, in order to test that functionality.

# Feature1
- The .cls files in the feature1 directory make up a more realistic set of classes, which utilize most, if not all, of ApexDox's documentation features. We'll primarily use these for snapshot testing. Since we're covering many cases, the references we collect based on the documentation these files produce can be used to compare to documentation produced after changes are made. Sometimes small changes to the codebase inadvertently result in changes to the output documentation.
- By comparing references to snapshots taken during testing, we can avoid this, and easily see whether or not our changes impact the output docs.
- If significant changes are made, and are intended to change the output documentation, the snapshot references will need to be updated in order to get the tests to pass.

# Feature2
- These files are purpose built to run specific assertions against which will test individual pieces of ApexDox functionality. If the assertions pass, we can be reasonably sure the code is behaving as we expect it to be.

NOTE: This is a test file. The `apexdox.engine.assets` setting will point to this file, which should be copied to the output docs assets directory.
