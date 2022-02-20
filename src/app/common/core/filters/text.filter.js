'use strict';

const TextFilter = {
    characters: () => {
        return (input, chars, breakOnWord) => {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars).replace(/(<([^>]+)>)/ig,"");

                if (!breakOnWord) {
                    let lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    },
    splitcharacters: () => {
        return (input, chars) => {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.replace(/(<([^>]+)>)/ig,"");
                let prefix = input.substring(0, chars/2);
                let postfix = input.substring(input.length-chars/2, input.length);
                return prefix + '...' + postfix;
            }
            return input;
        };
    },
    words: () => {
        return (input, words) => {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                input = input.replace(/(<([^>]+)>)/ig,"");                
                let inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '…';
                }
            }
            return input;
        };
    }
};

export default TextFilter;