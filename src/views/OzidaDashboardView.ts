import { ItemView, Notice, WorkspaceLeaf } from "obsidian";

export const OZIDA_DASHBOARD_VIEW_TYPE = "ozida-workspace-view";

type NavItem = {
  id: string;
  label: string;
  summary: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    summary: "A high-level command center for the current workspace.",
  },
  {
    id: "inbox",
    label: "Inbox",
    summary: "Capture new notes, tasks, messages, and raw inputs.",
  },
  {
    id: "email",
    label: "Email",
    summary: "Review email workflows and future mail-to-note pipelines.",
  },
  {
    id: "notes",
    label: "Notes",
    summary: "Browse and organize knowledge from the vault.",
  },
  {
    id: "airtable",
    label: "Airtable",
    summary: "Monitor future sync jobs and structured data connections.",
  },
  {
    id: "automations",
    label: "Automations",
    summary: "Track scripts, triggers, and repeatable workspace routines.",
  },
  {
    id: "settings",
    label: "Settings",
    summary: "Configure the workspace experience as features are added.",
  },
];

export class OzidaDashboardView extends ItemView {
  private activeNavId = "dashboard";
  private centerPanelEl?: HTMLElement;
  private navButtonEls = new Map<string, HTMLButtonElement>();

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return OZIDA_DASHBOARD_VIEW_TYPE;
  }

  getDisplayText() {
    return "Ozida Workspace";
  }

  getIcon() {
    return "layout-dashboard";
  }

  async onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("ozida-workspace-view");

    const shell = this.contentEl.createDiv({ cls: "ozida-shell" });

    this.buildLeftSidebar(shell);
    this.centerPanelEl = shell.createDiv({ cls: "ozida-center-panel" });
    this.buildRightPanel(shell);
    this.renderCenterPanel();
  }

  async onClose() {
    this.navButtonEls.clear();
  }

  private buildLeftSidebar(parentEl: HTMLElement) {
    const sidebarEl = parentEl.createDiv({ cls: "ozida-left-sidebar" });

    const brandEl = sidebarEl.createDiv({ cls: "ozida-brand" });
    brandEl.createEl("div", { text: "Ozida", cls: "ozida-brand-mark" });
    const brandTextEl = brandEl.createDiv({ cls: "ozida-brand-text" });
    brandTextEl.createEl("h2", { text: "Ozida Workspace" });
    brandTextEl.createEl("p", { text: "Personal operating dashboard" });

    const navEl = sidebarEl.createEl("nav", { cls: "ozida-nav" });

    NAV_ITEMS.forEach((item) => {
      const buttonEl = navEl.createEl("button", {
        text: item.label,
        cls: "ozida-nav-item",
        attr: {
          type: "button",
        },
      });

      buttonEl.addEventListener("click", () => {
        this.activeNavId = item.id;
        this.renderCenterPanel();
      });

      this.navButtonEls.set(item.id, buttonEl);
    });
  }

  private buildRightPanel(parentEl: HTMLElement) {
    const rightPanelEl = parentEl.createDiv({ cls: "ozida-right-panel" });

    const assistantCardEl = this.createCard(rightPanelEl, "AI Assistant");
    assistantCardEl.createEl("textarea", {
      cls: "ozida-ai-input",
      attr: {
        placeholder: "Ask about this workspace...",
      },
    });
    this.createActionButton(assistantCardEl, "Send Prompt", "AI assistant is not connected yet.");

    const quickActionsEl = this.createCard(rightPanelEl, "Quick Actions");
    const actionsGridEl = quickActionsEl.createDiv({ cls: "ozida-action-grid" });
    ["Capture Note", "Summarize", "Sync Data", "Run Automation"].forEach((label) => {
      this.createActionButton(actionsGridEl, label, `${label} action is a placeholder.`);
    });

    const contextCardEl = this.createCard(rightPanelEl, "Current Context");
    this.createMetaRow(contextCardEl, "Vault", "Active workspace");
    this.createMetaRow(contextCardEl, "Mode", "Dashboard");
    this.createMetaRow(contextCardEl, "Focus", "Planning and capture");

    const statusCardEl = this.createCard(rightPanelEl, "System Status");
    this.createStatusRow(statusCardEl, "Plugin", "Loaded");
    this.createStatusRow(statusCardEl, "AI", "Not connected");
    this.createStatusRow(statusCardEl, "Automations", "Idle");
  }

  private renderCenterPanel() {
    if (!this.centerPanelEl) {
      return;
    }

    const activeItem = NAV_ITEMS.find((item) => item.id === this.activeNavId) ?? NAV_ITEMS[0];

    this.navButtonEls.forEach((buttonEl, id) => {
      buttonEl.toggleClass("is-active", id === activeItem.id);
    });

    // Rebuilding the center panel keeps this first version easy to read.
    this.centerPanelEl.empty();

    const headerEl = this.centerPanelEl.createDiv({ cls: "ozida-center-header" });
    headerEl.createEl("p", { text: "Workspace", cls: "ozida-eyebrow" });
    headerEl.createEl("h1", { text: activeItem.label });
    headerEl.createEl("p", { text: activeItem.summary, cls: "ozida-section-summary" });

    const cardsEl = this.centerPanelEl.createDiv({ cls: "ozida-card-grid" });
    this.createWorkspaceCard(cardsEl, `${activeItem.label} Overview`, "Review the most important signals for this area.");
    this.createWorkspaceCard(cardsEl, "Next Actions", "Temporary action buttons will become real workflows over time.");
    this.createWorkspaceCard(cardsEl, "Recent Activity", "Future versions can surface notes, syncs, messages, and automation runs.");

    const commandBarEl = this.centerPanelEl.createDiv({ cls: "ozida-command-bar" });
    this.createActionButton(commandBarEl, "Create Item", `${activeItem.label}: create item is a placeholder.`);
    this.createActionButton(commandBarEl, "Refresh", `${activeItem.label}: refresh is a placeholder.`);
    this.createActionButton(commandBarEl, "Open Settings", "Settings action is a placeholder.");
  }

  private createWorkspaceCard(parentEl: HTMLElement, title: string, body: string) {
    const cardEl = this.createCard(parentEl, title);
    cardEl.createEl("p", { text: body, cls: "ozida-card-copy" });
    this.createActionButton(cardEl, "Open", `${title} is not implemented yet.`);
  }

  private createCard(parentEl: HTMLElement, title: string) {
    const cardEl = parentEl.createDiv({ cls: "ozida-card" });
    cardEl.createEl("h3", { text: title });
    return cardEl;
  }

  private createActionButton(parentEl: HTMLElement, label: string, notice: string) {
    const buttonEl = parentEl.createEl("button", {
      text: label,
      cls: "ozida-button",
      attr: {
        type: "button",
      },
    });

    buttonEl.addEventListener("click", () => {
      new Notice(notice);
    });

    return buttonEl;
  }

  private createMetaRow(parentEl: HTMLElement, label: string, value: string) {
    const rowEl = parentEl.createDiv({ cls: "ozida-meta-row" });
    rowEl.createEl("span", { text: label });
    rowEl.createEl("strong", { text: value });
  }

  private createStatusRow(parentEl: HTMLElement, label: string, value: string) {
    const rowEl = parentEl.createDiv({ cls: "ozida-status-row" });
    rowEl.createEl("span", { text: label });
    rowEl.createEl("strong", { text: value });
  }
}
