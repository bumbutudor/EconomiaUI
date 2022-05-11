import Widgets from 'flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets';
import InlineArticleView from './components/InlineArticleView';

export default function (app) {
    new Widgets()
        .add({
            key: 'discussions',
            component: InlineArticleView,
            isDisabled: false,
            isUnique: true,
            placement: 'end',
            position: 1,
        })
        .extend(app, 'tudor-economia-ui');
}