function display_table(tracks) {

  tracks.forEach((item, i) => {
    aaa_border = Number($('#track-' + item['code'] + ' td.aaa-border').text());
    your_score = Number(item['your_score']);
    if (your_score >= aaa_border) {
      diff_str = 'AAA +' + (your_score - aaa_border);
    } else {
      diff_str = 'AAA -' + (aaa_border - your_score);
    }

    $('#track-' + item['code'] + ' td.your-score').text(item['your_rank'] + ' (' + diff_str + ')');
    if (item['your_rank'] == 'AAA') {
      $('#track-' + item['code']).addClass('table-success');

    }
  });
}


$(function() {

  lv11_tracks = [];

  table_array.forEach((item, i) => {
    var row_html = ''
    row_html += '<tr id="track-';
    row_html += item[0];
    row_html += '"><td>'
    row_html += item[1];
    row_html += '</td><td>';
    row_html += item[2];
    row_html += '</td><td>';
    row_html += item[3];
    row_html += '</td><td class="your-score"></td><td class="aaa-border">';
    row_html += item[5];
    row_html += '</td></tr>';

    $('table#track_list tbody').append(row_html);

  });

  var table = $('table#track_list').DataTable({
    'order': [
      [1, 'desc']
    ],
    'searching': false,
    'scrollY': '50vh',
    'scrollCollapse': true,
    'lengthChange': false,
    'pageLength': 50,
    'drawCallback': function(settings) {
      display_table(lv11_tracks);
    }
  });

  $('.dataTables_length').addClass('bs-select');

  table.on('page.dt', function() {
    $('.dataTables_scrollBody').scrollTop(0);
  });

});
