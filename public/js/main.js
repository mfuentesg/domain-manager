'use strict';

!(($) => {
  $(document).on('ready', () => {

    $('.host-delete').on('click', (evt) => {
      evt.preventDefault();

      const $link = $(evt.currentTarget);
      const $item = $link.closest('.host-item');

      $.ajax({
        url: $link.attr('href'),
        type: 'DELETE',
        dataType: 'json',
        data: {
          address: $item
            .find('[data-address]')
            .data('address')
        }
      }).done((result) => {
        console.info('Host deleted');
        window.location.reload();
      }).fail((err) => {
        console.error(result);
      });
    });
  });
})(jQuery);
