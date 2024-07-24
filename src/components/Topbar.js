import { createElement } from "../core/DomUtils.js";
import { Component } from "../core/Component.js";

class Topbar extends Component {
    constructor(props) {
      super(props);
    }
    handleBackButtonClick = () => {
      
        window.history.back();
      }
    
      render() {
        const titles = [
          "My Tickets",
          "Olympics Companion",
          "My Favorites",
          "Events",
          "Spots",
          "Event’s Name",
          "Spot’s Name",
          "Settings"
        ];
    
        return createElement(
          'div',
          { className: 'topbar' },
          titles.map(title => (
            createElement(
              'div',
              { className: 'topbar-item' },
              createElement(
                'button',
                { onClick: this.handleBackButtonClick, className: 'back-button' },
                '←' 
              ),
              title,
            )
          ))
        );
      }
    }
    
    