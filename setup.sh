#!/bin/bash

# PM Agent Squad Master - Setup Script
# This script helps you customize and set up your AI agent template

set -e

echo "🚀 PM Agent Squad Master - Setup Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to prompt for input with default value
prompt_with_default() {
    local prompt=$1
    local default=$2
    local var_name=$3

    echo -ne "${BLUE}${prompt}${NC} [${default}]: "
    read input
    eval ${var_name}=\"${input:-$default}\"
}

echo -e "${GREEN}Step 1: Basic Agent Configuration${NC}"
echo "-----------------------------------"

prompt_with_default "Enter your agent name" "My AI Agent" AGENT_NAME
prompt_with_default "Enter a brief description" "AI-powered assistant" AGENT_DESC
prompt_with_default "Enter welcome message" "Hi! I'm your AI assistant. How can I help?" WELCOME_MSG
prompt_with_default "Enter agent icon/emoji" "🤖" AGENT_ICON

echo ""
echo -e "${GREEN}Step 2: Project Configuration${NC}"
echo "------------------------------"

prompt_with_default "Enter project directory name" "my-agent-project" PROJECT_NAME
prompt_with_default "Enter deployment platform" "vercel" DEPLOY_PLATFORM

echo ""
echo -e "${GREEN}Step 3: Knowledge Base Setup${NC}"
echo "-----------------------------"

echo -e "${YELLOW}Current knowledge base files:${NC}"
ls -1 Agent_Knowledge_Bases/*.md 2>/dev/null | wc -l | xargs echo "Found"
echo ""
echo -e "${YELLOW}Options:${NC}"
echo "1. Keep existing knowledge bases (customize them manually later)"
echo "2. Clear all knowledge bases (start fresh)"
echo "3. Skip knowledge base setup"
echo ""

prompt_with_default "Choose option (1-3)" "1" KB_OPTION

case $KB_OPTION in
    2)
        echo -e "${YELLOW}Clearing knowledge bases...${NC}"
        mkdir -p Agent_Knowledge_Bases/archive
        mv Agent_Knowledge_Bases/*.md Agent_Knowledge_Bases/archive/ 2>/dev/null || true
        echo "# Your Knowledge Base" > Agent_Knowledge_Bases/KB1_Primary_Knowledge.md
        echo "" >> Agent_Knowledge_Bases/KB1_Primary_Knowledge.md
        echo "Add your agent's knowledge here." >> Agent_Knowledge_Bases/KB1_Primary_Knowledge.md
        ;;
    3)
        echo -e "${YELLOW}Skipping knowledge base setup${NC}"
        ;;
    *)
        echo -e "${GREEN}Keeping existing knowledge bases${NC}"
        ;;
esac

echo ""
echo -e "${GREEN}Step 4: Updating Configuration Files${NC}"
echo "-------------------------------------"

# Update agent.config.json
if [ -f agent.config.json ]; then
    echo -e "${BLUE}Updating agent.config.json...${NC}"

    # Using sed to update configuration (works on both macOS and Linux)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"name\": \".*\"/\"name\": \"$AGENT_NAME\"/" agent.config.json
        sed -i '' "s/\"displayName\": \".*\"/\"displayName\": \"$AGENT_NAME\"/" agent.config.json
        sed -i '' "s/\"description\": \".*\"/\"description\": \"$AGENT_DESC\"/" agent.config.json
        sed -i '' "s/\"icon\": \".*\"/\"icon\": \"$AGENT_ICON\"/" agent.config.json
    else
        # Linux
        sed -i "s/\"name\": \".*\"/\"name\": \"$AGENT_NAME\"/" agent.config.json
        sed -i "s/\"displayName\": \".*\"/\"displayName\": \"$AGENT_NAME\"/" agent.config.json
        sed -i "s/\"description\": \".*\"/\"description\": \"$AGENT_DESC\"/" agent.config.json
        sed -i "s/\"icon\": \".*\"/\"icon\": \"$AGENT_ICON\"/" agent.config.json
    fi

    echo -e "${GREEN}✓ Configuration updated${NC}"
fi

# Update package.json
if [ -f package.json ]; then
    echo -e "${BLUE}Updating package.json...${NC}"

    PROJECT_SLUG=$(echo "$AGENT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/\"name\": \".*\"/\"name\": \"$PROJECT_SLUG\"/" package.json
        sed -i '' "s/\"description\": \".*\"/\"description\": \"$AGENT_DESC\"/" package.json
    else
        sed -i "s/\"name\": \".*\"/\"name\": \"$PROJECT_SLUG\"/" package.json
        sed -i "s/\"description\": \".*\"/\"description\": \"$AGENT_DESC\"/" package.json
    fi

    echo -e "${GREEN}✓ package.json updated${NC}"
fi

echo ""
echo -e "${GREEN}Step 5: Installing Dependencies${NC}"
echo "--------------------------------"

if [ -f package.json ]; then
    echo -e "${BLUE}Installing npm packages...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
fi

echo ""
echo -e "${GREEN}Setup Complete! 🎉${NC}"
echo "==================="
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Customize your knowledge bases in: ${BLUE}Agent_Knowledge_Bases/${NC}"
echo "2. Update quick actions in: ${BLUE}agent.config.json${NC}"
echo "3. Modify the chat interface in: ${BLUE}Agent_Chat_Interface.jsx${NC}"
echo "4. Review agent instructions in: ${BLUE}Agent_Config/${NC}"
echo ""
echo -e "${YELLOW}Development Commands:${NC}"
echo "  ${BLUE}npm run dev${NC}       - Start development server"
echo "  ${BLUE}npm run build${NC}     - Build for production"
echo "  ${BLUE}npm run deploy${NC}    - Deploy to $DEPLOY_PLATFORM"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo "  ${BLUE}README.md${NC}                  - Main documentation"
echo "  ${BLUE}TEMPLATE_GUIDE.md${NC}          - Template customization guide"
echo "  ${BLUE}Agent_Config/README.md${NC}     - Agent configuration guide"
echo ""
echo "Happy agent building! 🚀"
