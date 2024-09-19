import parse from 'html-react-parser';

// {
//     "meta": {
//         "id": 781281
//     },
//     "promo_name": "Welcome modal",
//     "start_date": "2024-09-19T00:00:00",
//     "end_date": "2024-09-22T00:00:00",
//     "is_active": true,
//     "cookie_name": "on-first-entry",
//     "text_content": "<p><strong>Welcome to Acme!</strong></p>\r\n<p>🎉 <strong>Congratulations!</strong> 🎉<br>You've just entered the wackiest, wildest, most <em>ACME</em>-mazing place in the world!</p>\r\n<p>💥 <strong>Here's a gift for you, pal!</strong> 💥<br>Use code <strong>\"WHAMMO10\"</strong> at checkout for <strong>10% off</strong> your first order! Whether you're chasing roadrunners 🏃&zwj;♂️ or outsmarting the cleverest coyotes 🐺, Acme has all the gadgets you need to make your adventures unforgettable.</p>\r\n<p>🎯 <strong>Ready for Action?</strong><br>Explore our explosive deals on <strong>rocket-powered roller skates</strong>, <strong>portable holes</strong>, and <strong>invisible paint</strong>. Beep beep! Don&rsquo;t wait&mdash;get the ACME gear to make your mischief <em>legendary</em>!</p>\r\n<p>🔔 <strong>Sign up now</strong> to receive the latest offers, straight from Wile E. Coyote&rsquo;s workshop!</p>",
//     "promo_link_href": "",
//     "promo_button_text": "",
//     "promo_button_color": {},
//     "form": {
//         "meta": {
//             "id": 781284
//         },
//         "form_name": "Email signup",
//         "form_text": "",
//         "fields": [
//             "/v2/content/?keys=form_field[_id=769905]"
//         ],
//         "background_color": {},
//         "submit_button_text": "Submit",
//         "submit_button_color": "/v2/content/?keys=brand_colors[_id=763563]"
//     }
// }

const PromoPopup = ({ data }) => {
    const { text_content } = data;

    console.log('props', data);
    return (
        <section className='max-w-md'>
            {parse(text_content)}
        </section>
    )
}

export default PromoPopup