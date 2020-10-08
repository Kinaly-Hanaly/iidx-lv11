function display_table(csv_tracks) {

  var exh_tracks_num = 0;
  var fc_tracks_num = 0;

  csv_tracks.forEach((item, i) => {
    $('#track-' + item['code'] + ' td.your-lamp').text(trim_lamp_name(item['your_lamp']));
    $('#track-' + item['code'] + ' td.your-miss').text(item['your_miss']);
    if (item['your_lamp'] == 'EX HARD CLEAR') {
      $('#track-' + item['code']).addClass('table-warning');
      exh_tracks_num += 1;
      $('#tile-' + item['code']).addClass('bg-warning');
    } else if (item['your_lamp'] == 'FULLCOMBO CLEAR') {
      $('#track-' + item['code']).addClass('table-info');
      fc_tracks_num += 1;
      $('#tile-' + item['code']).addClass('bg-info');
    }
  });


  $('#your-exh-num').text(exh_tracks_num + fc_tracks_num);
  if (csv_tracks.length > 0) {
    $('#your-exh-rate').text(Math.floor(((exh_tracks_num + fc_tracks_num) / table_array.length) * 100 * 10) / 10);
  } else {
    $('#your-exh-rate').text('---');
  }
  $('#progress-exh').text(exh_tracks_num);
  $('#progress-fc').text(fc_tracks_num);
  if (csv_tracks.length > 0) {
    $('#progress-exh').animate({
      width: (exh_tracks_num / table_array.length) * 100 + '%'
    }, 'fast');
    $('#progress-fc').animate({
      width: (fc_tracks_num / table_array.length) * 100 + '%'
    }, 'fast');
  } else {
    $('#progress-exh').width(0);
    $('#progress-fc').width(0);
  }

}

$(function() {

  lv11_tracks = [];
  var row_html = '';
  var tile_num_per_row = 30;

  $('#total-track-num').text(table_array.length);

  table_array.forEach((item, i) => {

    // table row start
    row_html = '';
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
    // table row end

    // tile start
    if ($('div#tile-map .tile-row:last').children().length >= tile_num_per_row) {
      row_html = '<div class="d-flex flex-row tile-row"></div>';
      $('div#tile-map').append(row_html);
    }

    row_html = '';
    row_html += '<div id="tile-';
    row_html += item[0];
    row_html += '" class="tile"></div>'

    $('div#tile-map .tile-row:last').append(row_html);
    // tile end

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
    'pageLength': 30,
    'dom': 'lfrpti',
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
