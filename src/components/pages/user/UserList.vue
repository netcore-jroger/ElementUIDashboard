<template>
  <el-col :span="20" style="text-align: left;">
    <el-input v-model="QueryForm.Name" placeholder="员工号、姓名、电话号"  class="inputText"></el-input>
    <el-button class="btn"  v-on:click="Query">查询</el-button>
    <el-button class="btn" v-on:click="Add">新增员工</el-button>
    <el-table :data="CurrentTableData" border style="width: 100%" >
      <el-table-column  prop="0"  label="所属公司"></el-table-column>
      <el-table-column  prop="1"  label="员工编号"></el-table-column>
      <el-table-column  prop="2"  label="姓名"></el-table-column>
      <el-table-column  prop="3"  label="英文名"></el-table-column>
      <el-table-column  prop="4"  label="性别"></el-table-column>
      <el-table-column  prop="5"  label="年龄"></el-table-column>
      <el-table-column  prop="6"  label="出生日期"></el-table-column>
      <el-table-column  prop="7"  label="所属部门"></el-table-column>
      <el-table-column  prop="8"  label="职位"></el-table-column>
      <el-table-column  prop="9"  label="入职时间"></el-table-column>
      <el-table-column  prop="10"  label="在职状态"></el-table-column>
      <el-table-column  prop="11"  label="电话"></el-table-column>
      <el-table-column  prop="12"  label="邮箱"></el-table-column>
      <el-table-column  operation="操作"  label="操作" width="200">
        <template scope="scope">
          <el-button  size="small" v-on:click.stop="Update(scope.$index, scope.row)">编辑 </el-button>
          <el-button  size="small"  type="danger"  v-on:click="Delete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="CurrentPage"
      :page-sizes="[5, 20]"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-col>
</template>

<script>
  export default {
    data () {
      return {
        CurrentTableData: [],
        QueryForm: {'Name': ''},
        CurrentPage: 1,
        PageSize: 10,
        total: 20
      };
    },
    mounted: function() {
      for(let i = 0; i < 8; i++) {
        this.$data.CurrentTableData.push({'0': 'Test', '1': 'Y00' + i, '2': '张三', '3': 'xxx', '4': '男', '5': '40', '6': '1980-01-01', '7': '技术部', '8': '技术总监', '9': '2014-01-01', '10': '在职', '11': '13511110000', '12': 'xxx@email.com'});
      };
      this.$data.total = this.$data.CurrentTableData.length;
    },
    methods: {
      Add: function () {

      },
      Query: function () {

      },
      Update: function () {

      },
      Delete: function () {
        alert();
      },
      handleSizeChange: function () {

      },
      handleCurrentChange: function () {

      }
    }
  };
</script>

<style scoped>
  @keyframes btn-animatin {
    from {
      background-color: #FFFFFF;
      box-shadow: 0 0 25px #333;
    }
    to {
      background-color: #20A0FF;
      color:white;
      box-shadow: 0 0 50px #EEF1F6;
    }
  }
  .inputText {
    width: 190px;
  }

</style>
