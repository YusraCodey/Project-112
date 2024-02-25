prediction1 = ""
prediction2 = ""
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
})

camera=document.getElementById("camera")

Webcam.attach ('#camera')

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
   
    })
}

console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zlgu43-hp/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!')
}

function check()
{
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}

function speak(){
    var synth = window.speechSynthesis
    speakdata = tospeak
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        if(results[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
            tospeak = "May peace and tranquility find you!"
        }
        if(results[0].label == "Good Job")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;"
            tospeak = "That was a marvelous victory!" 
        }
        if(results[0].label == "OK")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
            tospeak = "Alright, that's fine." 
        }
        if(results[0].label == "Love")
        {
            document.getElementById("update_emoji").innerHTML = "&#129782;"
            tospeak = "Wow, you seem so lovely and kind..." 
        }
        if(results[0].label == "Dislike")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;"
            tospeak = "Hmm...that's not very nice."
            
    }
    speak()
}
}
