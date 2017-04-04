// TODO:
// 仮のボタン設置。このスクリプトはscriptタグ自体を新たに生成してインラインスクリプトとして実行するものなので正常に動作しない。
// TwitterのAPIを使って動作するものに作り変える必要がある。
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

