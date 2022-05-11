import Widget from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';
import app from 'flarum/app';
import Placeholder from 'flarum/common/components/Placeholder';
import Discussion from 'flarum/common/models/Discussion';

export default class InlineArticleView extends Widget {
  oninit(vnode) {
    super.oninit(vnode);

    this.discussion;
    this.stream;
    this.near = 0;
    this.useBrowserScrollRestoration = true;

    // this.load();
  }

  className() {
    return 'InlineArticleView';
  }

  icon() {
    return 'fas fa-cirlce';
  }

  title() {
    return app.translator.trans('InlineArticle');
  }

  content() {
    // TODO replace 'core.forum.discussion_list.empty_text'
    const text = app.translator.trans('core.forum.discussion_list.empty_text');
    this.discussion = app.discussion;
    // this.load();

    return (
      <div className="Tudor-InlineArticleViewWidget">
        {this.discussion ? this.discussionPage() : Placeholder.component({ text })}
      </div>
    );
  }

  discussionPage() {
    return (
      <div className='DiscussionPage'>
        {this.discussion.title()}
        {/* <div className="DiscussionPage-discussion">{this.discussion ? this.pageContent().toArray() : this.loadingItems().toArray()}</div> */}
      </div>
    );
  }

  load() {
    const preloadedDiscussion = app.preloadedApiDocument();
    if (preloadedDiscussion) {
      // We must wrap this in a setTimeout because if we are mounting this
      // component for the first time on page load, then any calls to m.redraw
      // will be ineffective and thus any configs (scroll code) will be run
      // before stuff is drawn to the page.
      setTimeout(this.show.bind(this, preloadedDiscussion), 0);
    } else {
      const params = this.requestParams();

      app.store.find<Discussion>('discussions', this.discussion.id(), params).then(this.show.bind(this));
    }

    m.redraw();
  }

  /**
   * Initialize the component to display the given discussion.
   */
   show(discussion) {
    app.history.push('discussion', discussion.title());
    app.setTitle(discussion.title());
    app.setTitleCount(0);

    // When the API responds with a discussion, it will also include a number of
    // posts. Some of these posts are included because they are on the first
    // page of posts we want to display (determined by the `near` parameter) –
    // others may be included because due to other relationships introduced by
    // extensions. We need to distinguish the two so we don't end up displaying
    // the wrong posts. We do so by filtering out the posts that don't have
    // the 'discussion' relationship linked, then sorting and splicing.
    let includedPosts = [];
    if (discussion.payload && discussion.payload.included) {
      const discussionId = discussion.id();

      includedPosts = discussion.payload.included
        .filter(
          (record) =>
            record.type === 'posts' &&
            record.relationships &&
            record.relationships.discussion &&
            !Array.isArray(record.relationships.discussion.data) &&
            record.relationships.discussion.data.id === discussionId
        )
        // We can make this assertion because posts should be in the store,
        // since they were in the discussion's payload.
        .map((record) => app.store.getById<Post>('posts', record.id))
        .sort((a, b) => a.number() - b.number())
        .slice(0, 20);
    }

    // Set up the post stream for this discussion, along with the first page of
    // posts we want to display. Tell the stream to scroll down and highlight
    // the specific post that was routed to.
    this.stream = new PostStreamState(discussion, includedPosts);
    const rawNearParam = m.route.param('near');
    const nearParam = rawNearParam === 'reply' ? 'reply' : parseInt(rawNearParam);
    this.stream.goToNumber(nearParam || (includedPosts[0]?.number() ?? 0), true).then(() => {
      this.discussion = discussion;

      app.current.set('discussion', discussion);
      app.current.set('stream', this.stream);
    });
  }

  requestParams() {
    return {
      bySlug: true,
      page: { near: this.near },
    };
  }
}
