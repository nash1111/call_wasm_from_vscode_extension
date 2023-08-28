// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const wasmModule = await import('../../simple-wasm/pkg')
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "call-wasm-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('call-wasm-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from call-wasm-extension!');
	});

	let disposable2 = vscode.commands.registerCommand('call-wasm-extension.helloWorld2', () => {
		const hello = wasmModule.just_return_hello();
		vscode.window.showInformationMessage(hello);
	});

	let disposable3 = vscode.commands.registerCommand(
		'call-wasm-extension.helloWorld3',
		async () => {
		  const aValue = await vscode.window.showInputBox({ prompt: 'Enter the first number (a):' });
		  const bValue = await vscode.window.showInputBox({ prompt: 'Enter the second number (b):' });
	
		  if (aValue !== undefined && bValue !== undefined) {
			const a = parseInt(aValue, 10);
			const b = parseInt(bValue, 10);
	
			const result = wasmModule.add(a, b);
			vscode.window.showInformationMessage(`The sum of ${a} and ${b} is ${result}`);
		  }
		}
	  );
		

	context.subscriptions.push(disposable, disposable2, disposable3);
}

// This method is called when your extension is deactivated
export function deactivate() {}
