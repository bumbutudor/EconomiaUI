import app from 'flarum/common/app';
import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import Button from 'flarum/components/Button';

export default function () {


    extend(IndexPage.prototype, 'sidebarItems', function (items) {
        if (items.has('newDiscussion')) {
            items.remove('newDiscussion');
        }
    });

    extend(IndexPage.prototype, 'actionItems', function (items) {

        const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

        items.add(
            'newDiscussion',
            Button.component(
                {
                    icon: 'fas fa-edit',
                    className: 'Button Button--primary IndexPage-newDiscussion ',
                    itemClassName: 'App-primaryControl item-newDiscussion-stackoverflow',
                    onclick: () => {
                        // If the user is not logged in, the promise rejects, and a login modal shows up.
                        // Since that's already handled, we dont need to show an error message in the console.
                        return this.newDiscussionAction().catch(() => { });
                    },
                    disabled: !canStartDiscussion,
                },
                app.translator.trans(canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button')
            )
        );




    });

}