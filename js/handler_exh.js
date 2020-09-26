function display_table(tracks) {

  tracks.forEach((item, i) => {
    $('#track-' + item['code'] + ' td.your-lamp').text(item['your_lamp']);
    if (item['your_lamp'] == 'EX HARD CLEAR') {
      $('#track-' + item['code']).addClass('table-warning');
    } else if (item['your_lamp'] == 'FULLCOMBO CLEAR') {
      $('#track-' + item['code']).addClass('table-info');
    }
  });
}

$(function() {
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
});
