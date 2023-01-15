class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }
    
    rgb(){
        return `rgb(${r},${g},${b})`;
    }
    
    hex(){
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    rgba(a=1.0){
        return `rgba(${r},${g},${b},${a})`;
    }
}

const c1 = new Color(255, 67, 89, 'tomato')