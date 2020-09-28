function display_table(tracks) {

  tracks.forEach((item, i) => {
    $('#track-' + item['code'] + ' td.your-lamp').text(trim_lamp_name(item['your_lamp']));
    if (item['your_lamp'] == 'EX HARD CLEAR') {
      $('#track-' + item['code']).addClass('table-warning');
    } else if (item['your_lamp'] == 'FULLCOMBO CLEAR') {
      $('#track-' + item['code']).addClass('table-info');
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
    row_html += '</td><td class="your-lamp"></td></tr>';

    $('table#track_list tbody').append(row_html);

  });


  $('table#track_list').DataTable({
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



});
