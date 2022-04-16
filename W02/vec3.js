class Vec3
{
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    add( v )
    {
        this.x += v.getX();
        this.y += v.getY();
        this.z += v.getZ();
        return this;
    }

    sub( v )
    {
        this.x -= v.getX();
        this.y -= v.getY();
        this.z -= v.getZ();
        return this;
    }

    sum()
    {
        return this.x + this.y + this.z;
    }

    min()
    {
        const m =  this.x < this.y ? this.x : this.y;
        return m < this.z ? m : this.z;
    }

    max()

    {
        const m = this.x > this.y ? this.x : this.y;
        return m > this.z ? this.z : m;
    }

    mid()
    {
        return this.sum() - this.min() - this.max();
    }

    cross( v )
    {
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.getZ() - z * v.getY();
        this.y = z * v.getX() - x * v.getZ();
        this.z = x * v.getY() - y * v.getX();
        return this;
    }


    length()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }
    
}