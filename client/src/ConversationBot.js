import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

ConversationBot.propTypes = {}

function ConversationBot(props) {
  useEffect(() => {
    ;(function (d, m) {
      var kommunicateSettings = {
        appId: '3f1dd242c14acfccfbd54b6e00a8902a',
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      }
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app'
      var h = document.getElementsByTagName('head')[0]
      h.appendChild(s)
      window.kommunicate = m
      m._globals = kommunicateSettings
    })(document, window.kommunicate || {})
    /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
  }, [])
  return <div></div>
}

export default ConversationBot
