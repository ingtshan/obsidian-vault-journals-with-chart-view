module.exports = {
  entry: async (params, settings) => {
    const match = settings["PathMatchSetting"].length ? new RegExp(settings["PathMatchSetting"])  : null
    let options = (match ? params.app.vault.getMarkdownFiles().filter((f) => match.test(f.path)) : params.app.vault.getMarkdownFiles()).map(
      function (f) { return { text: f.basename, f: f } }
    )
    options = [
      { text: 'Daily', cid: 'periodic-notes:open-daily-note' },
      { text: 'Weekly', cid: 'periodic-notes:open-weekly-note' }
    ].concat(options)
    const pickOption = await params.quickAddApi.suggester(
      (v) => v.text,
      options
    )

    if (!pickOption) {
      new Notice("No Option", 5000);
      return;
    }

    if (pickOption.f) {
      params.app.workspace.activeLeaf.openFile(pickOption.f)
    } else {
      params.app.commands.executeCommandById(pickOption.cid)
    }

  },
  settings: {
    name: "QuickSwitchForOKR",
    author: "ingtshan",
    options: {
      "PathMatchSetting": {
        type: "text",
        defaultValue: "",
        placeholder: "match rule for your special files"
      }
    }
  }
}
