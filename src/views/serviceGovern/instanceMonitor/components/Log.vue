<template>
  <div>
    <el-alert
      title="最多显示最新的5000条日志"
      type="info"
      effect="light"
      :closable="false"
    />
    <div style="margin: 20px 20px 0">
      <el-input
        type="textarea"
        v-model="textarea"
        :autosize="{ minRows: 2, maxRows: 50 }"
        readonly
      >
      </el-input>
    </div>
  </div>
</template>

<script>
import Table from "@/views/components/Table.vue";

export default {
  name: "",
  components: { Table },
  data() {
    return {
      textarea:
        "Caused by: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: Table 'jd_item.item' doesn't exist at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method) ~[na:na] at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62) ~[na:na] at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45) ~[na:na] at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:490) ~[na:na] at com.mysql.jdbc.Util.handleNewInstance(Util.java:425) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.Util.getInstance(Util.java:408) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:943) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3970) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3906) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2524) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2677) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2549) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.PreparedStatement.executeInternal(PreparedStatement.java:1861) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.mysql.jdbc.PreparedStatement.executeQuery(PreparedStatement.java:1962) ~[mysql-connector-java-5.1.40.jar:5.1.40] at com.zaxxer.hikari.pool.ProxyPreparedStatement.executeQuery(ProxyPreparedStatement.java:52) ~[HikariCP-4.0.3.jar:na] at com.zaxxer.hikari.pool.HikariProxyPreparedStatement.executeQuery(HikariProxyPreparedStatement.java) ~[HikariCP-4.0.3.jar:na] at org.hibernate.engine.jdbc.internal.ResultSetReturnImpl.extract(ResultSetReturnImpl.java:57) ~[hibernate-core-5.5.2.Final.jar:5.5.2.Final] ... 62 common frames omitted",
    };
  },

  methods: {
    // 分页器
    handleSizeChange(val) {
      this.table.page.size = val;
    },

    handleCurrentChange(val) {
      this.table.page.current = val;
    },
  },
};
</script>
