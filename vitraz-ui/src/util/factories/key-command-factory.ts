import { BackspaceCommand } from "../text-utils/commands/backspace-command"
import { EnterCommand } from "../text-utils/commands/enter-command"
import { ShiftEnterCommand } from "../text-utils/commands/shift-enter-command"
import { KeyCommand } from "../text-utils/commands/key-command"
import { KeyHandlerContext } from "../text-utils/commands/key-handler-context"

class KeyCommandFactory {
	static createCommand(event: React.KeyboardEvent, context: KeyHandlerContext): KeyCommand | null {
		if (event.shiftKey && event.key === "Enter") {
			return new ShiftEnterCommand(context)
		} else if (event.key === "Enter") {
			return new EnterCommand(context)
		} else if (event.key === "Backspace") {
			return new BackspaceCommand(context)
		} else {
			return null
		}
	}
}

export const handleTextBlockKeyDown = (context: KeyHandlerContext): void => {
	const command = KeyCommandFactory.createCommand(context.event, context)
	command?.execute()
}
