var app = new Framework7();
var $$ = Dom7;

var mainView = app.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

var monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

var calendarDateFormat = app.calendar({
    input: '#calendar-date-format',
    value: [new Date(2015, 11, 17)],
    dateFormat: 'DD, MM dd, yyyy'
});

var calendarInline = app.calendar({
    container: '#calendar-inline-container',
    value: [new Date()],
    weekHeader: false,
    toolbarTemplate:
    '<div class="toolbar calendar-custom-toolbar">' +
    '<div class="toolbar-inner">' +
    '<div class="left">' +
    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
    '</div>' +
    '<div class="center"></div>' +
    '<div class="right">' +
    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
    '</div>' +
    '</div>' +
    '</div>',
    onOpen: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        $$('.calendar-custom-toolbar .left .link').on('click', function () {
            calendarInline.prevMonth();
        });
        $$('.calendar-custom-toolbar .right .link').on('click', function () {
            calendarInline.nextMonth();
        });
    },
    onMonthYearChangeStart: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    }
});

jQuery(function() {
    $('#calendar-inline-container').on('click', function() {
        $('#calendar-inline-container').addClass('hidden');
        $('#selected-date').removeClass('hidden');
    });
});

var ptrContent = $$('.pull-to-refresh-content');

ptrContent.on('refresh', function (e) {
    setTimeout(function () {
        var block = ptrContent.find('.additional-info_warning');
        block.removeClass('additional-info_warning');
        block.addClass('additional-info_success');
        block.text('Одобрено');
        app.pullToRefreshDone();
    }, 1000);
});