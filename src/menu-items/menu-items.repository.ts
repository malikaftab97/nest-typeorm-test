import {DataSource, Repository, Raw} from 'typeorm';
import {Injectable} from '@nestjs/common';
import { MenuItem } from './entities/menu-item.entity';
const _  = require('lodash');

@Injectable()
export class MenuItemRepository extends Repository<MenuItem>
{
    constructor(private dataSource: DataSource)
    {
        super(MenuItem, dataSource.createEntityManager());
    }

    /**
     * Get Parents and its all childrens of children tree.
     */

    getMenuItems = async () =>{
        const data = await this.find({});
        let index = _.mapKeys(data,'id');
        let type:any;
        const parentChildsList = type || {};
        _.each(index,function(v:any){
            if(!v.parentId){
                parentChildsList[v.id]=v;
            }else{
                if(!index[v.parentId].children){
                    index[v.parentId].children=[];
                }
                index[v.parentId].children.push(v);
            }
        });
        return parentChildsList;
    } 
}