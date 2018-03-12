var dataJson;
$(document).ready(function() {
  $.getJSON('script/fake-response/post-list.json', function(data) {
    dataJson = data;
    var items = [];
    var count = 0;
    $.each(data, function() {
      items.push(
        '<section class="sec"><div class="arrows"><ul><li><div class="up"></div></li><li class="likes">' +
          data[count].likes +
          '</li><li><div class="down"></div></li></ul></div><div class="figure"><img src=' +
          data[count].image +
          '></div><div class="postContent"><em>' +
          data[count].source +
          '</em><h1>' +
          data[count].title +
          '</h1><footer><ul><li><div class=' +
          data[count].subjectClass +
          '>' +
          data[count].subject +
          '</div></li><li>' +
          data[count].author +
          '</li><li>' +
          data[count].comments +
          ' Comments</ul></footer></div></section>'
      );
      count++;
    });
    items.push('<section><div id="more">More posts</div></section>');
    $('<div/>', {
      id: 'container',
      html: items.join('')
    }).appendTo('body');
  });
  $('#myInput').keyup(function() {
    var input, filter, div, sec, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    div = document.getElementById('container');
    sec = div.getElementsByTagName('section');
    for (i = 0; i < sec.length; i++) {
      a = sec[i].getElementsByTagName('h1')[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        sec[i].style.display = '';
      } else {
        sec[i].style.display = 'none';
      }
    }
  });
  $(document).on('click', 'div.up', function() {
    var index, counter;
    index = $('div.up').index(this);
    counter = parseInt(
      $('li.likes')
        .eq(index)
        .text()
    );
    if (
      !$('div.up')
        .eq(index)
        .hasClass('upLike')
    ) {
      counter += 1;
      $('div.up')
        .eq(index)
        .addClass('upLike');
      if (
        $('div.down')
          .eq(index)
          .hasClass('downLike')
      ) {
        counter += 1;
        $('div.down')
          .eq(index)
          .removeClass('downLike');
      }
      $('li.likes')
        .eq(index)
        .text(counter);
    } else {
      counter -= 1;
      $('div.up')
        .eq(index)
        .removeClass('upLike');
      $('li.likes')
        .eq(index)
        .text(counter);
    }
  });
  $(document).on('click', 'div.down', function() {
    var index, counter;
    index = $('div.down').index(this);
    counter = parseInt(
      $('li.likes')
        .eq(index)
        .text()
    );
    if (
      !$('div.down')
        .eq(index)
        .hasClass('downLike')
    ) {
      counter -= 1;
      $('div.down')
        .eq(index)
        .addClass('downLike');
      if (
        $('div.up')
          .eq(index)
          .hasClass('upLike')
      ) {
        counter -= 1;
        $('div.up')
          .eq(index)
          .removeClass('upLike');
      }
      $('li.likes')
        .eq(index)
        .text(counter);
    } else {
      counter += 1;
      $('div.down')
        .eq(index)
        .removeClass('downLike');
      $('li.likes')
        .eq(index)
        .text(counter);
    }
  });
  $(function() {
    num_posts_show = 3;
    speed_to_top = 1000; // in ms
    $('.sec').hide();
    $('section')
      .slice(0, num_posts_show)
      .show();
    $('#more').on('click', function(e) {
      e.preventDefault();
      $('section:hidden')
        .slice(0, num_posts_show)
        .slideDown();
      if ($('section:hidden').length == 0) {
        $('#load').fadeOut('slow');
      }
      $('html,body').animate(
        {
          scrollTop: $(this).offset().top
        },
        1500
      );
    });
  });

  $('#totop').click(function() {
    $('body,html').animate(
      {
        scrollTop: 0
      },
      speed_to_top
    );
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#totop').fadeIn();
    } else {
      $('#totop').fadeOut();
    }
  });
});
