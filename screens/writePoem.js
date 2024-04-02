import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import React from "react";
import { useState } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

export default function WritePoem() {

    const [poem, setPoem] = useState({
        title: '',
        author: '',
        lines: [],
    });

    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
        initialContent,
    });

    const initialContent = `<p>This is a basic example!</p>`;

    const handleHead = ({ tintColor }) => ( 
        <Text style={{ color: tintColor }}>H1</Text> 
    );

    const richText = React.useRef();

    return(
        <SafeAreaView style={styles.container}>
            <RichText editor={editor} />
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.KeyboardAvoidingView}>
                <Toolbar editor={editor}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
        /*<SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={
                        Platform.OS === 'ios'?'padding':'height'}
                    style={{flex:1}}>
                        <RichToolbar 
                            style={{ marginTop: 10 }}
                            editor={richText}
                            actions={[
                                actions.setBold,
                                actions.setItalic,
                                actions.setUnderline,
                                actions.setStrikethrough,
                                actions.insertBulletsList,
                                actions.insertOrderedList,]}
                        />
                        <Text style={{ fontFamily: "monospace", 
                                   fontWeight: 900, 
                                   fontSize: 15, 
                                   padding: 10}}> 
                            Description: 
                        </Text> 
                        <RichEditor 
                            ref={richText}
                            onChange={(descriptionText) => {
                                console.log('descriptionText: ', descriptionText);
                            }}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>*/
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    keyboardAvoidingView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
});  