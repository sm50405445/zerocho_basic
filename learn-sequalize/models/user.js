module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('user',{
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        age:{
            //UNSIGNED 음수 제외
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married:{
            type:DataTypes.BOOLEAN,
            allowNull: false
        },
        comment:{
            type:DataTypes.TEXT,
            allowNull: true
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull: false,
            defaultValue:sequelize.literal('now()')
        }
    },{
        timestamps:false,
        //스네이크케이스 false일경우 camelcase
        underscored:true
    })
}

//users 테이블
//이름,나이,결혼여부,댓글,생성일
//lsm,31,false,안녕하세요,2019-03-20
