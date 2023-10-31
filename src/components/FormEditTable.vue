<template>
    <el-form ref="form" :model="formData" label-width="auto" label-position="right" size="default">
        <el-form-item label="CEP">
            <el-input  type="text" id="cep" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.cep" />
            <el-button @click="buscarCEP()">Buscar CEP</el-button>
        </el-form-item>
        <el-form-item label="Logradouro">
            <el-input type="text" id="logradouro" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.logradouro" />
        </el-form-item>
        <el-form-item label="Número">
            <el-input type="text" id="numero" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.numero"/>
        </el-form-item>
        <el-form-item label="Complemento">
            <el-input type="text" id="complemento" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.complemento"/>
        </el-form-item>
        <el-form-item label="Bairro">
            <el-input type="text" id="bairro" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.bairro"/>
        </el-form-item>
        <el-form-item label="Cidade">
            <el-input type="text" id="localidde" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.localidade"/>
        </el-form-item>
        <el-form-item label="Estado">
            <el-select type="text" id="uf" class="form-control mb-3" required placeholder="Selecione o estado" v-model="formData.uf">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="País">
            <el-input type="text" id="pais" placeholder="Digite aqui" class="form-control mb-3" required v-model="formData.pais"/>
        </el-form-item>

        <el-button type="primary" @click="onSubmit">Atualizar</el-button>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const formData = {
    id: ref(''),
    cep: ref(''),
    logradouro: ref(''),
    numero: ref(''),
    complemento: ref(''),
    bairro: ref(''),
    localidade: ref(''),
    uf: ref(''),
    pais: ref('Brasil'),
};

async function buscarCEP() {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep.value}/json`);
        if (!response.ok) {
            throw new Error('CEP não encontrado');
        }
        const conteudo = await response.json();

        formData.logradouro.value = conteudo.logradouro;
        formData.bairro.value = conteudo.bairro;
        formData.localidade.value = conteudo.localidade;
        formData.uf.value = conteudo.uf;
        formData.pais.value = 'Brasil';

    } catch (error) {
        console.error('Erro ao buscar CEP:', error.message);
        alert('CEP não encontrado, verifique se o CEP está correto.');
    }
}

async function onSubmit() {
    try {
        const response = await axios.put(`http://localhost:8000/enderecos/${formData.id.value}`, formData);
        console.log('Dados atualizados com sucesso!', response.data);
    } catch (error) {
        console.error('Erro ao atualizar os dados:', error);
    }
}
</script>

<style>
.el-radio-group {
    margin-right: 12px;
}
</style>
