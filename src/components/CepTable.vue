<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="CEP" prop="cep" />
        <el-table-column label="Logradouro" prop="logradouro" />
        <el-table-column label="Número" prop="numero" />
        <el-table-column label="Complemento" prop="complemento" />
        <el-table-column label="Bairro" prop="bairro" />
        <el-table-column label="Localidade" prop="localidade" />
        <el-table-column label="Estado" prop="uf" />
        <el-table-column label="País" prop="pais" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                <FormEdit v-if="showFormEdit" :rowData="selectedRow" />
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'

interface User {
    id : string,
    cep: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    pais: string,
}

const search = ref('')
const tableData = ref<User[]>([])
const selectedRow = ref<string>();

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/enderecos')
        tableData.value = response.data
    } catch (error) {
        console.error('Erro ao buscar dados: ' + error)
    }
}

const filterData = (data: User) => {
    return (
        data.cep.toLowerCase().includes(search.value.toLowerCase()) ||
        data.logradouro.toLowerCase().includes(search.value.toLowerCase()) ||
        data.complemento.toLowerCase().includes(search.value.toLowerCase()) ||
        data.bairro.toLowerCase().includes(search.value.toLowerCase()) ||
        data.localidade.toLowerCase().includes(search.value.toLowerCase()) ||
        data.uf.toLowerCase().includes(search.value.toLowerCase()) ||
        data.pais.toLowerCase().includes(search.value.toLowerCase())
    )
}

const filterTableData = computed(() =>
    tableData.value.filter(filterData)
)

const showFormEdit = ref(false);

const handleEdit = (index: number, row: User) => {
    selectedRow.value = row.id;
    showFormEdit.value = true;
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

onMounted(() => {
    fetchData()
})
</script>




