import app from 'flarum/app';
import Page from 'flarum/common/components/Page';
import Component from 'flarum/common/Component';

export default class ArticlePage extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.discussion = this.attrs.discussion || null;
    this.stream;
    this.near = 0;
    this.useBrowserScrollRestoration = true;
  }

  view() {
    return (
      <div className='ArticlePage'>
        {this.discussion.title()}
      </div>
    );
  }
}
