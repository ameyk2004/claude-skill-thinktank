.PHONY: package clean

# Default target
all: package

# Package the skill
package: clean
	@echo "📦 Packaging ThinkTank skill..."
	@cd thinktank && zip -r ../thinktank.skill .
	@echo "✅ Successfully created thinktank.skill! You can now import it into Claude Code."

# Remove the old skill file
clean:
	@echo "🧹 Removing old thinktank.skill..."
	@rm -f thinktank.skill
