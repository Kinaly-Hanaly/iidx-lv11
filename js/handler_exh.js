function display_table(tracks) {

  var exh_tracks_num = 0;
  var fc_tracks_num = 0;

  tracks.forEach((item, i) => {
    $('#track-' + item['code'] + ' td.your-lamp').text(trim_lamp_name(item['your_lamp']));
    $('#track-' + item['code'] + ' td.your-miss').text(item['your_miss']);
    if (item['your_lamp'] == 'EX HARD CLEAR') {
      $('#track-' + item['code']).addClass('table-warning');
      exh_tracks_num += 1;
    } else if (item['your_lamp'] == 'FULLCOMBO CLEAR') {
      $('#track-' + item['code']).addClass('table-info');
      fc_tracks_num += 1;
    }
  });


  $('#your-exh-num').text(exh_tracks_num + fc_tracks_num);
  if (tracks.length > 0) {
    $('#your-exh-rate').text(Math.floor(((exh_tracks_num + fc_tracks_num) / tracks.length) * 100 * 10) / 10);
  } else {
    $('#your-exh-rate').text('---');
  }
  $('#progress-exh').text(exh_tracks_num);
  $('#progress-fc').text(fc_tracks_num);
  $('#progress-exh').animate({
    width: (exh_tracks_num / tracks.length) * 100 + '%'
  }, 'fast');
  if (tracks.length > 0) {
    $('#progress-fc').animate({
      width: (fc_tracks_num / tracks.length) * 100 + '%'
    }, 'fast');
  } else {
    $('#progress-fc').width(0);
  }

}

$(function() {

  lv11_tracks = [];

  $('#total-track-num').text(table_array.length);

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
    row_html += '</td><td class="your-lamp"></td><td class="your-miss"></td></tr>';

    $('table#track_list tbody').append(row_html);

  });


  var table = $('table#track_list').DataTable({
    'order': [
      [1, 'desc']
    ],
    'columnDefs': [{
      'orderable': false,
      'targets': [3, 4]
    }],
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
    $('.dataTables_scrollBody').animate({
      scrollTop: 0
    }, 'slow');
  });

});
