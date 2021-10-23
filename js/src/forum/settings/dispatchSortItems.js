import app from 'flarum/common/app';
import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';

export default function () {


    extend(IndexPage.prototype, 'viewItems', function (items) {
        if (items.has('sort')) {
            items.remove('sort');
        }

        // items.add(
        //     'Actuale',
        //     LinkButton.component({
        //       title: "Actuale",
        //       className: 'Button Button--primary',
        //       href: '/',
        //     },
        //       app.translator.trans('tudor-economia-ui.forum.sort_button_1')
        //     )
        // );
      
        items.add(
            'Citite',
            LinkButton.component({
                title: "Citite",
                className: 'Button Button--primary',
                href: '/',
            },
                app.translator.trans('tudor-economia-ui.forum.sort_button_2')
            )
        );

        items.add(
            'Noi',
            LinkButton.component({
                title: "Noi",
                className: 'Button Button--primary',
                href: '?sort=newest',
            },
                app.translator.trans('tudor-economia-ui.forum.sort_button_3')
            )
        );

        items.add(
            'Vechi',
            LinkButton.component({
                title: "Vechi",
                className: 'Button Button--primary',
                href: '?sort=oldest',
            },
                app.translator.trans('tudor-economia-ui.forum.sort_button_4')
            )
        );
    })
}