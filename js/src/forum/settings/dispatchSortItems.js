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
      
        // items.add(
        //     'Citite',
        //     LinkButton.component({
        //         title: "Citite",
        //         className: 'Button Button--primary',
        //         href: '/',
        //     },
        //         app.translator.trans('tudor-economia-ui.forum.sort_button_2')
        //     )
        // );

        items.add(
            'Noi',
            <LinkButton href='?sort=newest' title={app.translator.trans('tudor-economia-ui.forum.sort_button_3')}>
                {app.translator.trans('tudor-economia-ui.forum.sort_button_3')}
            </LinkButton>
        );

        items.add(
            'Vechi',
            <LinkButton href='?sort=oldest' title={app.translator.trans('tudor-economia-ui.forum.sort_button_4')}>
                {app.translator.trans('tudor-economia-ui.forum.sort_button_4')}
            </LinkButton>
        );

        
        items.add(
            'Vote', 
            <LinkButton href='?sort=hot' title={app.translator.trans('tudor-economia-ui.forum.sort_button_5')}>
                {app.translator.trans('tudor-economia-ui.forum.sort_button_5')}
            </LinkButton>
        );


        
    })
}