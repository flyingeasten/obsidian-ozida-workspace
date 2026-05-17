import { Notice, Plugin, WorkspaceLeaf } from "obsidian";
import {
  OZIDA_DASHBOARD_VIEW_TYPE,
  OzidaDashboardView,
} from "./views/OzidaDashboardView";

export default class OzidaWorkspacePlugin extends Plugin {
  async onload() {
    // ItemViews are Obsidian workspace tabs. Registering the type lets
    // Obsidian create and restore this dashboard like any other view.
    this.registerView(
      OZIDA_DASHBOARD_VIEW_TYPE,
      (leaf: WorkspaceLeaf) => new OzidaDashboardView(leaf),
    );

    // The ribbon icon is the primary entry point for opening the dashboard.
    this.addRibbonIcon("layout-dashboard", "Open Ozida Workspace", async () => {
      await this.activateDashboardView();
      new Notice("Ozida Workspace opened");
    });
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(OZIDA_DASHBOARD_VIEW_TYPE);
  }

  private async activateDashboardView() {
    const { workspace } = this.app;

    // Keep one dashboard tab open at a time so the ribbon action is predictable.
    workspace.detachLeavesOfType(OZIDA_DASHBOARD_VIEW_TYPE);

    const leaf = workspace.getLeaf(true);

    await leaf.setViewState({
      type: OZIDA_DASHBOARD_VIEW_TYPE,
      active: true,
    });

    workspace.revealLeaf(leaf);
  }
}
