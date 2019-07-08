$('#clear').hide()
var btn = $('#btn')
$(btn).click(function () {
    var pokemonName = $('#input').val()
    var link = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName
    console.log(link)
    $.ajax({
        type: 'get',
        url: link,
        dataType: 'json',
        error: function () {
            alert('please enter correct pokemon name')
        }
    }).done(function (data) {
        var pokemonData = data
        var skill = pokemonData.abilities
        for (i = 0; i < skill.length; i++) {
            var subLink = skill[i].ability.url
            $.ajax({
                url: subLink,
                async:false,
                success: function () {
                    console.log('2nd load success')
                }
            }).done(function (subData) {
                var descrData = subData
                $('#body-container').prepend($('<br>'))
                $('#body-container').prepend(descrData.flavor_text_entries[0].flavor_text)
                $('#body-container').prepend($('<br>'))
            })
            $('#body-container').prepend($('<br>'))
            $('#body-container').css({
                'font-size': 35,
                'textAlign': 'center'
            }).prepend(skill[i].ability.name)
            $('#body-container').prepend($('<br>'))
        }
    })
    $('#clear').show()
    $('#clear').click(function(){
        $('#body-container').empty()
    })
    $('#input').val('')
})


