function display_table(csv_tracks) {

  var aaa_tracks_num = 0;

  csv_tracks.forEach((item, i) => {
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
      aaa_tracks_num += 1;
      $('#tile-' + item['code']).addClass('bg-aaa');
    }
  });

  $('#your-aaa-num').text(aaa_tracks_num);
  if (csv_tracks.length > 0) {
    $('#your-aaa-rate').text(Math.floor((aaa_tracks_num / table_array.length) * 100 * 10) / 10);
  } else {
    $('#your-aaa-rate').text('---');
  }
  $('#progress-aaa').text(aaa_tracks_num);
  if (csv_tracks.length > 0) {
    $('#progress-aaa').animate({
      width: (aaa_tracks_num / table_array.length) * 100 + '%'
    }, 'fast');
  } else {
    $('#progress-aaa').width(0);
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
    row_html += '</td><td class="your-score"></td><td class="aaa-border">';
    row_html += item[5];
    row_html += '</td></tr>';

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
      'targets': [3]
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
