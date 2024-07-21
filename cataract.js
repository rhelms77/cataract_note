/*eslint-env browser*/
/*global $*/

"use strict";

$(document).ready(function () {

    function update() {
        const text_fields = ["date", "name", "attending", "resident", "assistant",
        "lens_type", "lens_sn", "lens_exp", "technique", "case_time", "ept", "apt", "usavg",
        "irrigation", "ebl", "moxi_lot", "moxi_exp", "moxi_dose", "kenalog_lot", "kenalog_exp",
        "kenalog_dose"];
        for (const field of text_fields) {
            let text_field = '.text_' + field;
            let input_field = '#input_' + field;
            if ($(input_field).val() == '') {
                $(text_field).each(function() {
                    $(this).text('???');
                    $(this).css({'color': 'red', 'text-decoration': 'underline'});
                });
            }
            else {
                $(text_field).each(function() {
                    $(this).text($(input_field).val());
                    $(this).css({'color': 'blue'});
                });
            }
        }

        $('#cb_block').prop('checked') ? $('.block_text').show() : $('.block_text').hide();
        $('#cb_blue').prop('checked') ? $('.blue_text').show() : $('.blue_text').hide();
        $('#cb_istent').prop('checked') ? $('.istent_text').show() : $('.istent_text').hide();
        $('#cb_viscoat').prop('checked') ? $('.viscoat_text').show() : $('.viscoat_text').hide();
        $('#cb_lasik').prop('checked') ? $('.lasik_text').show() : $('.lasik_text').hide();

        if($('input[name="drops"]:checked').length > 0) {
            $('.text_drops').text('The patient was instructed to start the following drops:');
        } else {
            $('.text_drops').text('No post-drops indicated.');
        }

        $('#cb_po_pred').prop('checked') ? $('.text_po_pred').show() : $('.text_po_pred').hide();
        $('#cb_po_diclo').prop('checked') ? $('.text_po_diclo').show() : $('.text_po_diclo').hide();
        $('#cb_po_moxi').prop('checked') ? $('.text_po_moxi').show() : $('.text_po_moxi').hide();
        $('#cb_po_polytrim').prop('checked') ? $('.text_po_polytrim').show() : $('.text_po_polytrim').hide();

        switch ($('input[name="rb_eye"]:checked').val()) {
            case 'od':
                $('.eye_class').text('right');
                $('.text_para_location').text('10:30');
                break;
            case 'os':
                $('.eye_class').text('left');
                $('.text_para_location').text('4:30');
                break;
            default:
                $('.eye_class').text('???');
                $('.text_para_location').text('???');
                break;
        }

        // Update keratome size
        $('.text_wound_size').text($('input[name="input_wound_size"]:checked').val());

        // Update toric
        const toric_axis = $('#input_lens_axis').val();
        if(toric_axis == '') {
            $('.toric_text').hide();
        }
        else {
            $('.toric_axis').text(toric_axis);
            $('.toric_text').show();
        }

        // Hide complex unless something below shows it
        $('.text_complex').hide();

        const ring_size = $("input[name='ring']:checked").val();
        if(ring_size == 'none') {
            $('.ring_text').hide();
        }
        else {
            $('.text_ring_size').text(ring_size);
            $('.ring_text').show();
            $('.text_complex').show();
        }

    }

    $('#button_today').click(function() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;
        $('#input_date').val(currentDate);
    });

    $('#button_update').click(update);

    $('#button_copy').click(function() {
        update();
        const text = document.getElementById("note").innerText;
        navigator.clipboard
          .writeText(text)
          .then(() => console.log(`"${text}" was copied to clipboard.`))
          .catch((err) => console.error('Error copying to clipboard: ${err}'));
    });
    
    $('#button_reset_all').click(function() {
        $('input[type=text]').each(function () {
            $(this).val($(this).prop('defaultValue'));
        });
        $('input[type=checkbox]').prop('checked', false);
        $('input[type=radio][name=rb_eye]').prop('checked', false);
        $('input[name=input_wound_size]:first').prop('checked', true);
        update();
    });


    $('#button_reset_some').click(function() {
        $('.erase').val($(this).prop('defaultValue'));
        $('input[type=checkbox]').prop('checked', false);
        $('input[type=radio][name=rb_eye]').prop('checked', false);
        update();
    });
    
    update();
});
