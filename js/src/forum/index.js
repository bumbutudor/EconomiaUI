import moveButtonToRight from './settings/moveButtonToRight.js';
import dispatchSortItems from './settings/dispatchSortItems.js';
// import CardItem from './settings/CardItem.js';
import registerWidget from '../common/registerWidget';

import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionPage from 'flarum/components/DiscussionPage';
import IndexPage from 'flarum/components/IndexPage';
import { extend, override } from 'flarum/extend';
import InlineArticleView from '../common/components/InlineArticleView';
import highlight from 'flarum/helpers/highlight';
import escapeRegExp from 'flarum/utils/escapeRegExp';
import app from 'flarum/app';
import ArticlePage from './components/ArticlePage';
import listItems from 'flarum/common/helpers/listItems';

app.initializers.add('tudor/economia-ui', () => {
  //moveButtonToRight();
  //dispatchSortItems();
  // CardItem();

  // added by BlockCat
  // console.log(app);
  registerWidget(app);

  extend(DiscussionPage.prototype, 'oninit', function () {
    app.discussions.refreshParams(app.search.params(), m.route.param('page'));

    if (app.discussions.hasItems() || app.discussions.isLoading()) {
      app.pane?.enable();
    }
    
  });


  extend(DiscussionPage.prototype, 'view', function (view) {
    const index = IndexPage.prototype.sidebarItems();
    // const index = IndexPage.prototype.view();

    view.children.unshift(
      <nav className="IndexPage-nav sideNav">
        <ul>{listItems(index.toArray())}</ul>
      </nav>
    );
    // view.children.unshift(
    //   index
    // );

  });

  // extend(DiscussionListItem.prototype, 'view', function (view) {
  //   // get needed data
  //   const discussion = this.attrs.discussion;
  //   let jumpTo = 0;

  //   if (this.attrs.params.q) {
  //     const post = discussion.mostRelevantPost();
  //     if (post) {
  //       jumpTo = post.number();
  //     }

  //     const phrase = escapeRegExp(this.attrs.params.q);
  //     this.highlightRegExp = new RegExp(phrase + '|' + phrase.trim().replace(/\s+/g, '|'), 'gi');
  //   } else {
  //     jumpTo = Math.min(discussion.lastPostNumber(), (discussion.lastReadPostNumber() || 0) + 1);
  //   }

  //   // extract container with tags_autor from Vasile modification
  //   // const tags_autor = view.children[2].children[2].children.pop();
  //   // extract container with info from Vasile modification
  //   const info = view.children[2].children[2].children.pop();
  //   // remove DiscussionListItem-main container
  //   view.children[2].children.splice(2, 1);

  //   // create new DiscussionListItem-main container
  //   const main = m('.DiscussionListItem-main', {
  //     // onclick should open modal
  //     // onclick: this.changeWidgetView.bind(this),
  //   }, [
  //     m('h3', {
  //       className: 'DiscussionListItem-title',
  //     }, highlight(discussion.title(), this.highlightRegExp)),
  //     info,
  //     // tags_autor,
  //   ]);

  //   // add new DiscussionListItem-main container in structure
  //   view.children[2].children.splice(2, 0, main);

  //   // console.log(main);
  //   // console.log(view.children[2].children[2]);
  // });

  // DiscussionListItem.prototype.changeWidgetView = function () {
  //   console.log(app);
  //   app.discussion = this.attrs.discussion;
  // console.log(app);
  // const discussionURL = app.route.discussion(discussion);
  // console.log(discussion.id());
  // app.modal.show(ArticleModal, {
  //   discussion: this.attrs.discussion,
  // });
  // extend(InlineArticleView.prototype, 'content', function (view) {
  //   view.children.pop();
  //   // console.log(view);

  //   // const pageContent = DiscussionPage.component({id: discussionId, near: 0});

  //   view.children.push(<ArticlePage discussion={discussion}/>);
  //   console.log(view);

  // });
  // e.stopPropagation();
  // };
});