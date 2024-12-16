import { BackspaceCommand } from "../text-utils/commands/backspace-command"
import { EnterCommand } from "../text-utils/commands/enter-command"
import { ShiftEnterCommand } from "../text-utils/commands/shift-enter-command"
import { KeyCommand } from "../text-utils/commands/key-command"

class KeyCommandFactory {
	static createCommand(event: React.KeyboardEvent, context: KeyHandlerContext): KeyCommand | null {
		switch (event.key) {
			case "Enter":
				return event.shiftKey ? new ShiftEnterCommand(context) : new EnterCommand(context)
			case "Backspace":
				return new BackspaceCommand(context)
			default:
				return null
		}
	}
}

export const handleTextBlockKeyDown = (context: KeyHandlerContext): void => {
	const command = KeyCommandFactory.createCommand(context.event, context)
	command?.execute()
}
