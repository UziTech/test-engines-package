'use babel';

import TestEnginesPackageView from './test-engines-package-view';
import { CompositeDisposable } from 'atom';

export default {

  testEnginesPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testEnginesPackageView = new TestEnginesPackageView(state.testEnginesPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testEnginesPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-engines-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testEnginesPackageView.destroy();
  },

  serialize() {
    return {
      testEnginesPackageViewState: this.testEnginesPackageView.serialize()
    };
  },

  toggle() {
    console.log('TestEnginesPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
