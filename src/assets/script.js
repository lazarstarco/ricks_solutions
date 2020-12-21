function insert(username, transaction, event, points) {
    var dateObj = new Date()

    var date = dateObj.getDate() + ". "

    switch (dateObj.getMonth()) {
        case 0: date += 'Jan. '
            break
        case 1: date += 'Feb. '
            break
        case 2: date += 'Mar. '
            break
        case 3: date += 'Apr. '
            break
        case 4: date += 'May '
            break
        case 5: date += 'Jun. '
            break
        case 6: date += 'Jul. '
            break
        case 7: date += 'Aug. '
            break
        case 8: date += 'Sep. '
            break
        case 9: date += 'Oct. '
            break
        case 10: date += 'Nov. '
            break
        case 11: date += 'Dec. '
            break
    }

    date += dateObj.getFullYear() + "."

    var time = dateObj.getHours() + " : " + dateObj.getMinutes()

    var data = {
        username,
        transaction,
        date,
        time,
        event,
        points
    }
    
    $.ajax({
        type: 'post',
        url: window.location.href.toString().split(window.location.host)[1].split('?')[0],
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    })

    setTimeout(function () { window.location.replace("/events?username=" + username); }, 2000);

}

function checkCode(code) {
    var data = {
        query: window.location.href.toString().split(window.location.host)[1].split('?')[1],
        code
    }

    data.query = data.query.split('=').join(',').split('&').join(',').split(',')

    $.ajax({
        type: 'post',
        url: '/user',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    })

    setTimeout(function () { window.location.replace("/events?username=" + data.query[1]); }, 3000);

}

$("#redeem_code").keypress(() => {
    if ($("#redeem_code").val().length === 18) {
        $("#hidden").attr('hidden', false)
    }
    if ($("#redeem_code").val().length === 19) {
        checkCode($("#redeem_code").val())
        $("#redeem_code").attr('disabled', 'disabled')
    }
    if (($("#redeem_code").val().length !== 19 && $("#redeem_code").val().length !== 0) && (($("#redeem_code").val().length + 1) % 5 === 0 || $("#redeem_code").val().length === 4)) {
        $('#redeem_code').val($("#redeem_code").val() + '-')
    }
});

$("#clearCode").click(() => {
    $("#redeem_code").val("")
    $("#redeem_code").attr('disabled', false)
})

function signin(button, event) {
    if (event) {
        $(button).text("Sign-in successful")
        alert("You successfully signed in!");
    } else {
        $(button).text("Coupon succesfuly taken")
        alert("You successfully took the coupon. It will be sent on your email!");
    }
    $(button).disabled = true;
    $(button).removeClass("btn-success");
    $(button).addClass("btn-info");
}

function change_active(navbar_element) {
    $("li").removeClass("active");
    $(navbar_element).addClass("active");
}

